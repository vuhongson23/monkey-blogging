import { Button } from "components/button";
import React from "react";
import styled from "styled-components";

const HomeBannerStyles = styled.div`
  display: flex;
  align-items: center;
  min-height: 520px;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  margin-bottom: 60px;
  .banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-content {
      width: 445px;
      color: white;
    }
    &-heading {
      margin-bottom: 20px;
      font-size: 36px;
      font-weight: 700;
      font-size: 48px;
      line-height: 58px;
    }
    &-desc {
      width: 421px;
      font-weight: 400;
      font-size: 14px;
      line-height: 28px;
      margin-bottom: 48px;
    }
    &-image {
    }
  }
`;

const HomeBanner = () => {
  return (
    <HomeBannerStyles>
      <div className="container">
        <div className="banner">
          <div className="banner-content">
            <h1 className="banner-heading">Monkey Blogging</h1>
            <p className="banner-desc">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              labore dignissimos corrupti dolores architecto tempora, incidunt
              nesciunt ab necessitatibus aperiam. Vitae quam, maiores neque
              totam iste aliquid modi dolorum porro.
            </p>
            <Button to="/sign-up" kind="secondary">
              Get Started
            </Button>
          </div>
          <div className="banner-image">
            <img src="/img-banner.png" alt="banner" />
          </div>
        </div>
      </div>
    </HomeBannerStyles>
  );
};

export default HomeBanner;
