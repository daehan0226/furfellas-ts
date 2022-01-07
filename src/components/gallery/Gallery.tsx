import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { createQueryParams, getCurrentStringDate, strfDatetime, addMonthToCurrentDate } from '../../utils/utils';
import { TagSelect, DateSelect } from '../common/select';
import { MainApi } from '../../ApiService';
import { Radio } from 'antd';
import PhotoGallery from './PhotoGallery';
import { Photo as IPhoto, Action as IAction, Location as ILocation, Pet as IPet } from "../../models";
import SlideGallery from './SlideGallery';
import { Tag } from "../common"
import useFetch from '../../hooks/useFetch';

import { FileExcelOutlined } from '@ant-design/icons';

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


const EmptyContainer = styled.div`
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

    const api = MainApi.getInstance()
    const pet = useFetch<IPet>([], api.getPets)
    const action = useFetch<IAction>([], api.getActions)
    const location = useFetch<ILocation>([], api.getLocations)

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
        if (sort === "asc") {
            setPhotos([...photos.sort((a, b) => (a.create_datetime > b.create_datetime ? 1 : -1))])
        } else {
            setPhotos([...photos.sort((a, b) => (a.create_datetime < b.create_datetime ? 1 : -1))])
        }
    }, [sort]);

    return (
        <Container>
            <SubContainer>
                <TagSelect
                    placeholder="Choose actions"
                    onChange={(data) => handleSelectedItemChange("actions", data)}
                    options={action.data}
                    loading={action.loading}
                />
                <TagSelect
                    placeholder="Choose locations"
                    onChange={(data) => handleSelectedItemChange("locations", data)}
                    options={location.data}
                    loading={location.loading}
                />
                <TagSelect
                    placeholder="Choose pets"
                    onChange={(data) => handleSelectedItemChange("pets", data)}
                    options={pet.data}
                    loading={pet.loading}
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
            {photos.length > 0 ? (
                <ImageContainer>
                    {displayType === 'slide' ? (
                        <SlideGallery items={photos} />
                    ) : (
                        <PhotoGallery items={photos} />
                    )}
                </ImageContainer>
            ) : (
                <EmptyContainer>  
                    <FileExcelOutlined />
                    <p>No photos</p>
                </EmptyContainer>
            )}
        </Container>
    );
};

export default Gallery;
