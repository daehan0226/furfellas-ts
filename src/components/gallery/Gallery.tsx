import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useActionState, useLocationState, usePetState } from '../../contexts';
import { createQueryParams, getCurrentStringDate, strfDatetime, addMonthToCurrentDate } from '../../utils/utils';
import { TagSelect, DateSelect } from '../common/select';
import { MainApi } from '../../ApiService';
import { Radio } from 'antd';
import PhotoGallery from './PhotoGallery';
import { Photo as IPhoto } from "../../models";
import SlideGallery from './SlideGallery';
import { Tag } from "../common"

const Container = styled.div`
`;

const SubContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 0px 10px;

    > * {
        margin: 5px;
    }
`;


const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 200px;
  justify-content: center;
`;

type IDisplayType = 'slide' | 'gallery'

const Gallery: React.FC = () => {
    const [selectedItems, setSelectedItems] = useState({
        actions: "",
        locations: "",
        pets: ""
    })
    const [dateInfo, setDateInfo] = useState({
        begin: strfDatetime(addMonthToCurrentDate(-1)),
        end: getCurrentStringDate()
    })
    const [displayType, setDisplayType] = useState<IDisplayType>('slide')
    const [photos, setPhotos] = useState<IPhoto[]>([])
    const [sort, setSort] = useState("asc");

    const actionState = useActionState();
    const locationState = useLocationState();
    const petState = usePetState();

    const getPhotos = async (params: string) => {
        const api = MainApi.getInstance()
        const photoData = await api.getPhotos(params)
        setPhotos([...photoData.data.result])
    }

    useEffect(() => {
        const params = createQueryParams({
            pet_ids: selectedItems.pets,
            action_ids: selectedItems.actions,
            location_ids: selectedItems.locations,
            start_datetime: dateInfo.begin,
            end_datetime: dateInfo.end
        });
        getPhotos(params)
    }, [selectedItems, dateInfo]);

    const handleSelectedItemChange = (key: string, value: number[]) => {
        setSelectedItems({
            ...selectedItems,
            [key]: value
        })
    }

    const handleSelectedDateChange = (key: string, date: string) => {
        setDateInfo({
            ...dateInfo,
            [key]: date
        })
    }

    const handleTypeChange = (value: IDisplayType) => {
        setDisplayType(value)
    }

    useEffect(() => {
        let sorted = [];
        if (sort === "asc") {
            sorted = photos.sort((a, b) => (a.create_datetime > b.create_datetime ? 1 : -1));
        } else {
            sorted = photos.sort((a, b) => (a.create_datetime < b.create_datetime ? 1 : -1));
        }
        setPhotos([...sorted]);
    }, [sort]);

    return (
        <Container>
            <SubContainer>
                <TagSelect
                    placeholder="Choose actions"
                    onChange={(data) => handleSelectedItemChange("actions", data)}
                    options={actionState.items}
                />
                <TagSelect
                    placeholder="Choose locations"
                    onChange={(data) => handleSelectedItemChange("locations", data)}
                    options={locationState.items}
                />
                <TagSelect
                    placeholder="Choose pets"
                    onChange={(data) => handleSelectedItemChange("pets", data)}
                    options={petState.items}
                />
            </SubContainer>
            <SubContainer>
                <DateSelect
                    title="Start Date"
                    date={dateInfo.begin}
                    setDate={(date) => handleSelectedDateChange("begin", date)}
                />
                <DateSelect
                    title="End Date"
                    date={dateInfo.end}
                    setDate={(date) => handleSelectedDateChange("end", date)}
                />
            </SubContainer>
            <SubContainer>
                <Radio.Group defaultValue="slide" buttonStyle="solid" onChange={(e) => handleTypeChange(e.target.value)} >
                    <Radio.Button value="slide">Slide</Radio.Button>
                    <Radio.Button value="gallery">Gallery</Radio.Button>
                </Radio.Group>
            </SubContainer>
            <SubContainer>
                <Tag
                    style={{ cursor: 'pointer' }}
                    onClick={() => { setSort(sort === 'asc' ? 'desc' : 'asc') }}
                    color="success"
                    text={`From ${sort === 'asc' ? "old" : "new"} Photos`}
                />
            </SubContainer>
            <ImageContainer>
                {displayType === 'slide' ? (
                    <SlideGallery items={photos} />
                ) : (
                    <PhotoGallery items={photos} />
                )}
            </ImageContainer>
        </Container>
    );
};

export default Gallery;
