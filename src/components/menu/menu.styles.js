import styled from "styled-components";

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  margin-top: 40px;
`;

export const MenuItem = styled.div`
  width: 100%;
`;

export const MenuItemHeadingContainer = styled.div`
  display: flex;
  padding: 10px 30px 10px 30px;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-size: 20px;
  }
`;

export const FormInputContainer = styled.form`
  margin-left: 30px;
`;

//items
export const EldenItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-left: 30px;
`;

export const EldenItem = styled.div`
  padding: 10px;
  width: 90%;
  p {
    font-size: 12px;
  }
`;

export const EldenItemTitle = styled.p`
  margin-bottom: 15px;
`;

export const EldenItemStatsAndImg = styled.div`
  display: flex;
  justify-content: space-between;
  img {
    width: 100px;
    height: 100px;
  }
`;

export const EldenItemInfo = styled.ul`
  list-style-type: none;
`;
