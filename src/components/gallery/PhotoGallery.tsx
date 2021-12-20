import { useEffect, useState } from "react";
import styled from "styled-components";
import { Photo as IPhoto } from "../../models"

const Container = styled.div`
    /* Prevent vertical gaps */
    line-height: 0;
    
    -webkit-column-count: 5;
    -webkit-column-gap:   0px;
    -moz-column-count:    5;
    -moz-column-gap:      0px;
    column-count:         5;
    column-gap:           0px;  

  ${(props) => props.theme.media.desktop`
    -moz-column-count:    4;
    -webkit-column-count: 4;
    column-count:         4;
  `}
  ${(props) => props.theme.media.tablet`
    -moz-column-count:    3;
    -webkit-column-count: 3;
    column-count:         3s;
  `}
  ${(props) => props.theme.media.phone`
    -moz-column-count:    2;
    -webkit-column-count: 2;
    column-count:         2;
  `}
`
const GalleryImage = styled.img`
  width: 100% !important;
  height: auto !important;
`

interface IGalleryPhoto extends IPhoto {
    src?: string;
    name?: string;
}

interface PhotoGalleryProps {
    items: IGalleryPhoto[],
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ items }) => {
    const [images, setImages] = useState<IGalleryPhoto[]>([]);

    useEffect(() => {
        if (items.length > 0) {
            setImages([...items.map(setGalleryProperties)]);
        } else {
            setImages([]);
        }
    }, [items])

    const setGalleryProperties = (item: IGalleryPhoto) => {
        return ({
            src: item.original,
            ...item
        })
    }
    return (
        <Container>
            {images.map(({ id, src, name }) => (
                <div key={id}>
                    <GalleryImage
                        src={src}
                        alt={name}
                        loading={'lazy'}
                        data-index={id}
                    />
                </div>
            ))}
        </Container>
    );
};

export default PhotoGallery;


