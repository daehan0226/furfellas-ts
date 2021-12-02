import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useAction, useLocation, usePet } from '../../contexts';
import { createQueryParams, getCurrentStringDate, strfDatetime, addMonthToCurrentDate } from '../../utils/utils';
import { TagSelect, DateSelect } from '../common/select';
import { MainApi } from '../../ApiService';

const Container = styled.div`
`;

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

    const actions = useAction();
    const locations = useLocation();
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

    return (
        <Container>
            <>
                <TagSelect placeholder="Choose actions" onChange={handleSelectedItemChange} selectKey={"actions"} options={actions ? actions.data : []} />
                <TagSelect placeholder="Choose locations" onChange={handleSelectedItemChange} selectKey={"locations"} options={locations ? locations.data : []} />
                <TagSelect placeholder="Choose pets" onChange={handleSelectedItemChange} selectKey={"pets"} options={pets ? pets.data : []} />
            </>
            <>
                <DateSelect title="Start Date" date={dateInfo.begin} setDate={(date) => handleSelectedDateChange("begin", date)} />
                <DateSelect title="End Date" date={dateInfo.end} setDate={(date) => handleSelectedDateChange("end", date)} />
            </>
        </Container>
    );
};

export default Header;
