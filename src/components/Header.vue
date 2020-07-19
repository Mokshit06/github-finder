<template>
  <HeaderWrapper>
    <HeaderInfo>
      <ImageArea>
        <UserImage :src="user.avatar_url" alt="profile" />
      </ImageArea>
      <User>{{ user.name }}</User>
      <UserName :href="user.html_url" target="_blank" rel="noopener noreferrer"
        >@{{ user.login }}</UserName
      >
      <Bio v-if="user.bio">{{ user.bio }}</Bio>
      <Date>
        <i class="fa fa-calendar"></i>
        <p>Joined {{ user.created_at | formatDate }}</p>
      </Date>
      <ProfileGrid>
        <GridItem>
          <span>{{ user.public_repos }}</span>
          <p>Repositories</p>
        </GridItem>
        <GridItem>
          <span>{{ user.followers }}</span>
          <p>Followers</p>
        </GridItem>
        <GridItem>
          <span>{{ user.following }}</span>
          <p>Following</p>
        </GridItem>
      </ProfileGrid>
    </HeaderInfo>
  </HeaderWrapper>
</template>

<script>
import styled from "vue-styled-components";
import moment from "moment";

const HeaderWrapper = styled.section`
  background: #1a1e22;
  padding: 3.5rem 5rem 9rem;

  @media (max-width: 800px) {
    padding: 3rem 1.9rem 6.4rem;
  }
`;

const HeaderInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  @media (max-width: 800px) {
    font-size: 95%;
  }
`;

const ImageArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
  width: 160px;
  border: 0.5rem solid #4c69fa;
  border-radius: 50%;

  @media (max-width: 600px) {
    width: 135px;
  }
`;

const User = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #f8f8f8;
  font-weight: 500;
`;

const UserImage = styled.img`
  width: 100%;
  max-width: 100%;
  border-radius: 50%;
  vertical-align: middle;
`;

const UserName = styled.a`
  text-decoration: none;
  font-family: "Fira Code", monospace;
  font-size: 1.5em;
  font-weight: 400;
  margin-bottom: 1.8rem;
  color: #4c69fa;
`;

const Bio = styled.p`
  font-size: 1.2em;
  max-width: 45rem;
  color: #eef5ff;
  font-weight: 400;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin-bottom: 1.7rem;
`;

const Date = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 1rem 0.5rem;
  color: #c8e1ff;
  font-weight: 400;
  font-size: 1.1em;

  & i {
    margin-right: 10px;
    font-size: 0.9rem;
  }
`;

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 150px));
  gap: 0.5rem;
  margin-top: 2rem;
  justify-content: center;
`;

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #24292e;
  text-align: center;
  border-radius: 4px;
  padding: 1em;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

  & span {
    color: #f8f8f8;
    font-size: 1.4em;
  }

  & p {
    text-transform: uppercase;
    font-size: 0.75em;
    letter-spacing: 1px;
    font-weight: 400;
    font-family: "Montserrat", sans-serif;
    margin-top: 0.5rem;
    color: #c8e1ff;
    opacity: 0.7;
  }
`;

export default {
  name: "Header",
  components: {
    HeaderWrapper,
    HeaderInfo,
    ImageArea,
    User,
    UserImage,
    UserName,
    Bio,
    Date,
    ProfileGrid,
    GridItem
  },
  filters: {
    formatDate(date) {
      return moment(date).format("MMM D, YYYY");
    }
  },
  props: ["user"]
};
</script>