import { useEffect, useState } from "react";
import styled from "styled-components";
import { Photo as IPhoto } from "../../models"
import ImageGallery from 'react-image-gallery';


const Container = styled.div`
    width: 100%
`

interface ISlidePhoto extends IPhoto {
    originalHeight?: number;
    thumbnailHeight?: number;
}

interface PhotoGalleryProps {
    items: ISlidePhoto[],
}


const SlideGallery: React.FC<PhotoGalleryProps> = ({ items }) => {
    const [images, setImages] = useState<ISlidePhoto[]>([]);

    useEffect(() => {
        if (items.length > 0) {
            setImages([...items.map(setGalleryProperties)]);
        } else {
            setImages([]);
        }
    }, [items])

    const setGalleryProperties = (item: ISlidePhoto) => {
        return ({
            ...item,
            originalHeight: 400,
            thumbnailHeight: 80
        })
    }
    return (
        <Container>
            <ImageGallery
                items={images}
            />
        </Container>
    );
};

export default SlideGallery;


