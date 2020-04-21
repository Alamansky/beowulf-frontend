import React from "react";
import Link from "next/link";
import WhiteSpace from "./styles/WhiteSpace";
import styled from "styled-components";
import changeAlpha from "../lib/changeAlpha";

const BreadcrumbBar = styled.div`
  white-space: pre-wrap;
  margin: 2rem 0;
  padding: 2rem;
  border-bottom: 2px solid ${({ theme }) => changeAlpha(theme.lightgrey, 0.5)};
`;

const Crumb = styled.span`
  > a > span {
    padding-bottom: 1rem;
  }

  > a > span:hover {
    border-bottom: 2px solid ${(props) => props.theme.black};
  }
`;

const Breadcrumbs = ({ chain }) => {
  let crumbs = chain.map((item, index) => {
    return (
      <Crumb key={item[1]}>
        <Link href={item[1]}>
          <a>
            <span>{item[0]}</span>
          </a>
        </Link>
        {index == chain.length - 1 ? "" : `  >  `}
      </Crumb>
    );
  });
  return <BreadcrumbBar>{crumbs}</BreadcrumbBar>;
};

export default Breadcrumbs;
