import { useEffect, useState, FC } from "react";
import { Table, Input, InputNumber, Popconfirm, Form, Typography, DatePicker, Button, Tag } from 'antd';
import moment from "moment";
import styled from "styled-components";
import { useActionState, useLocationState, usePetState, usePhotoState } from "../../contexts";
import { changeToDisplayStringDatetime, getCurrentStringDatetime } from "../../utils";
import { TagSelect } from "../common/select";
import { Photo as IPhoto, PhotoTable as IPhotoTable, } from "../../models"
import { InputFile } from "../common";


const Container = styled.section`
    margin: 10px auto;
    ${({ theme }) => theme.media.phone`
        width: 100%;
    `}
`;
const Image = styled.img`
  width: 80px;
  height: auto;
`;


const ListBox = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

type IEditableCell = {
    editing: any,
    dataIndex: any,
    title: any,
    inputType: any,
    record: any,
    index: any,
    children: any,

}

const EditableCell: FC<IEditableCell> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};



const initialValues = {
    file: null,
    actions: [],
    location: {
        id: 0,
        name: ""
    },
    pets: [],
    description: "",
    create_datetime: getCurrentStringDatetime(),
    id: 0,
    key: 0,
    src: "",
}

const PhotoTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState<IPhotoTable[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [editingKey, setEditingKey] = useState<number>(-1);
    const [saveOpen, setSaveOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const actionState = useActionState();
    const locationState = useLocationState();
    const petState = usePetState();
    const photoState = usePhotoState();

    const [selectedActionIds, setSelectedActionIds] = useState<Number[]>([]);
    const [selectedLocationId, setSelectedLocationId] = useState<String>('');
    const [selectedPetIds, setSelectedPetIds] = useState<Number[]>([]);
    const [selectedDate, setSelectedDate] = useState<String>("");

    const convertToPhotoTable = (item: IPhoto) => {
        const { id, actions, pets, location, description, create_datetime } = item
        return {
            id,
            actions,
            pets,
            location,
            description,
            create_datetime,
            key: id,
            src: item.thumbnail,
            file: null
        }
    }

    useEffect(() => {
        setData(photoState.items.map(convertToPhotoTable))
    }, [photoState.items])

    const isEditing = (record: any) => record.id === editingKey;
    const cancel = () => { setEditingKey(-1); };

    const edit = (record: any) => {
        form.setFieldsValue({
            ...initialValues,
            ...record,
        });
        if (record.id) {
            setSelectedLocationId(record.location.id);
            setSelectedPetIds(record.pets.map((item: any) => item.id));
            setSelectedActionIds(record.actions.map((item: any) => item.id));
            setSelectedDate(record.create_datetime)
        }
        setEditingKey(record.id);
    };

    const handleAdd = () => {
        setData([{ ...initialValues }, ...data])
    };

    const handleDelete = () => {
    };

    const onDatetimeChange = (_: any, dateString: string) => {
        setSelectedDate(dateString)
    }

    useEffect(() => {
        setSaveOpen(false)
        console.log(selectedActionIds, selectedLocationId, selectedPetIds)
        const validateSelects = () => {
            if (selectedLocationId === '') {
                return false
            }
            if (selectedActionIds && Object.keys(selectedActionIds).length === 0) {
                return false
            }
            if (selectedPetIds && Object.keys(selectedPetIds).length === 0) {
                return false
            }
            return true
        }

        const validateFile = () => {
            return (editingKey > 0 || file) ? true : false
        }

        if (validateSelects() && validateFile()) {
            setSaveOpen(true)
        }

    }, [selectedActionIds, selectedLocationId, selectedPetIds, editingKey, file])


    const save = () => {
        try {
            const description = form.getFieldValue("description");
            console.log(editingKey, description, selectedDate, selectedPetIds, selectedActionIds, selectedLocationId)
            // setLoading(true)
            // uploadService({
            //     id,
            //     file,
            //     pets: selectedPetIds,
            //     actions: selectedActionIds,
            //     location: selectedLocationId,
            //     description,
            //     create_datetime,
            //     successCallback: () => {
            //         setEditingKey('');
            //         setFile(null);
            //         refreshTodos()
            //         setLoading(false)
            //     },
            //     failCallback: () => {
            //         setLoading(false)
            //     },
            // });

        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Image',
            dataIndex: 'file',
            width: '5%',
            render: (_: any, record: any) => {
                const editable = isEditing(record);
                return record.id ? (
                    <Image
                        src={record.src}
                        alt={record.description}
                    />
                ) : editable ? (
                    <InputFile file={file} setFile={(data) => setFile(data)} />
                ) : (
                    <p>No image</p>
                )
            },
        },
        {
            title: 'Description',
            dataIndex: 'description',
            width: '10%',
            editable: true,
        },
        {
            title: 'Pets',
            dataIndex: 'pets.name',
            width: '5%',
            render: (_: any, record: any) => {
                const editable = isEditing(record);
                return editable ? (
                    <TagSelect
                        options={petState.items}
                        placeholder={"Select pets"}
                        defaultValue={record.id ? record.pets.map((item: any) => item.id) : []}
                        onChange={(data) => setSelectedPetIds(data)}
                    />
                ) : (
                    <>
                        {record.pets.map((item: any) => (
                            <Tag color={`#${item.color}`} key={item.name} style={{ marginBottom: 4 }}>
                                {item.name}
                            </Tag>
                        ))}
                    </>
                )
            }
        },
        {
            title: 'Actions',
            dataIndex: 'actions.name',
            width: '5%',
            render: (_: any, record: any) => {
                const editable = isEditing(record);
                return editable ? (
                    <TagSelect
                        options={actionState.items}
                        placeholder={"Select actions"}
                        defaultValue={record.id ? record.actions.map((item: any) => item.id) : []}
                        onChange={(data) => setSelectedActionIds(data)}
                    />
                ) : (
                    <>
                        {record.actions.map((item: any) => (
                            <Tag color="blue" key={item.name} style={{ marginBottom: 4 }}>
                                {item.name}
                            </Tag>
                        ))}
                    </>
                )
            }
        },
        {
            title: 'Location',
            dataIndex: 'location.name',
            width: '5%',
            render: (_: any, record: any) => {
                const editable = isEditing(record);
                return editable ? (
                    <TagSelect
                        multipleSelect={false}
                        options={locationState.items}
                        placeholder={"Select a location"}
                        defaultValue={record.id ? [record.location.id] : []}
                        onChange={(data: any) => setSelectedLocationId(data)}
                    />
                ) : (
                    <p>{record.location.name}</p>
                )
            }
        },
        {
            title: 'Date',
            dataIndex: 'create_datetime',
            width: '20%',
            render: (_: any, record: any) => {
                const editable = isEditing(record);
                return editable ? (
                    <DatePicker
                        onChange={onDatetimeChange} defaultValue={moment(record.create_datetime, 'YYYY-MM-DD')}
                    />
                ) : (
                    <p>{changeToDisplayStringDatetime(record.create_datetime)}</p>
                )
            }
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            width: '5%',
            render: (_: any, record: any) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <button
                            disabled={!saveOpen}
                            onClick={() => save()}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </button>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <button>Cancel</button>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== -1} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            width: '5%',
            render: (_: any, record: any) =>
                data.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete()}>
                        <Typography.Link>Delete</Typography.Link>
                    </Popconfirm>
                ) : null,
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record: any) => ({
                record,
                inputType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <Container>
            <Button
                onClick={handleAdd}
                type="primary"
                style={{
                    marginBottom: 16,
                }}
            >
                Add a photo
            </Button>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    loading={loading}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form>
        </Container>
    );
};

export default PhotoTable;