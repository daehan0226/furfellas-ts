import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useAction, useLocationDispatch, useLocationState, usePet } from '../../contexts';
import { createQueryParams, getCurrentStringDate, strfDatetime, addMonthToCurrentDate } from '../../utils/utils';
import { TagSelect, DateSelect } from '../common/select';
import { MainApi } from '../../ApiService';
import { Radio } from 'antd';

const Container = styled.div`
`;

const FilterContainer = styled.div`
`;

const DateSelectContainer = styled.div`
`;

type IDisplayType = 'slide' | 'gallery'

const Header: React.FC = () => {
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

    const actions = useAction();
    const locationState = useLocationState();
    const pets = usePet();

    const getPhotos = async (params: string) => {
        const api = new MainApi()
        const photoData = await api.getPhotos(params)
        console.log(photoData);
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
        console.log(value)
        setDisplayType(value)
    }

    return (
        <Container>
            <FilterContainer>
                <TagSelect placeholder="Choose actions" onChange={(data) => handleSelectedItemChange("actions", data)} options={actions ? actions.data : []} />
                <TagSelect placeholder="Choose locations" onChange={(data) => handleSelectedItemChange("locations", data)} options={locationState.length > 0 ? locationState : []} />
                <TagSelect placeholder="Choose pets" onChange={(data) => handleSelectedItemChange("pets", data)} options={pets ? pets.data : []} />
            </FilterContainer>
            <DateSelectContainer>
                <DateSelect title="Start Date" date={dateInfo.begin} setDate={(date) => handleSelectedDateChange("begin", date)} />
                <DateSelect title="End Date" date={dateInfo.end} setDate={(date) => handleSelectedDateChange("end", date)} />
            </DateSelectContainer>

            <>
                <Radio.Group defaultValue="slide" buttonStyle="solid" onChange={(e) => handleTypeChange(e.target.value)} >
                    <Radio.Button value="slide">Slide</Radio.Button>
                    <Radio.Button value="gallery">Gallery</Radio.Button>
                </Radio.Group>
            </>
        </Container>
    );
};

export default Header;
