import React, { useState, useEffect, FC } from "react";
import styled from "styled-components";
import Button from "./Button";

const Container = styled.div`
  justify-content: flex-start;
`;

const Input = styled.input`
  &[type="file"] {
    display: none;
  }
`;

const PreviewImg = styled.img`
  width: 100px;
  height: auto;
`;

interface IInputFile {
    file: null | File;
    setFile: (data: null | File) => void
}


const InputFile: FC<IInputFile> = ({ file, setFile }) => {
    const [imgSrc, setImgSrc] = useState<string>("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        setFile(e.target.files[0])
    };

    const onDelete = () => {
        setFile(null);
        setImgSrc("");
    };

    useEffect(() => {
        if (!file) {
            setImgSrc("");
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setImgSrc(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    return (
        <Container>
            <label>
                <Input type="file" multiple onChange={onChange} />
                <span>Attach</span>
            </label>
            {file && file.name && (
                <Container>
                    <span>{file.name}</span>
                    <PreviewImg src={imgSrc} alt={file.name} />
                    <Button text={"Delete"} onClick={onDelete} />
                </Container>
            )}
        </Container>
    );
};

export default InputFile;
