import styled from "styled-components";
// import { FlexCenterBox } from "../../styles/common-styles";
// import { changeToDisplayStringDatetime } from "../../utils/utils";

const Container = styled.div``;

const Text = styled.h5`
  margin-bottom: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
`;

const ImageWrapper = styled.div`
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
`;

interface CardBodyProps {
  data: {
    birthday: string,
    weight: number,
    intro: string,
    photo?: {
      id: number,
      url: string
    }
  }
}


const CardBody: React.FC<CardBodyProps> = ({ data }) => {
  return (
    <Container>
      <Text>Brithday : {data.birthday}</Text>
      <Text>Weight : {data.weight}kg</Text>
      <Wrapper>
        <h6>{data.intro}</h6>
      </Wrapper>
      <ImageWrapper>
        {/* <Image src={data.photo.url} alt={`${data.name}'s photo`} /> */}
      </ImageWrapper>
    </Container>
  );
};

export default CardBody;
