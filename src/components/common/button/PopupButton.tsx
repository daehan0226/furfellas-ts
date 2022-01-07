import React from "react";
import { Popconfirm } from 'antd';
import { Button } from "./"

interface Props {
    id: number,
    name: string,
    confirmAction: (id: number) => void
}

const PopUpDeleteButton = ({ id, name, confirmAction }: Props) => {
    return (
        <Popconfirm title={`Are you sure to delete ${name}？`} okText="Yes" onConfirm={() => confirmAction(id)} cancelText="No">
            <Button text={"Delete"} danger={true} />
        </Popconfirm>
    )
}

export default PopUpDeleteButton