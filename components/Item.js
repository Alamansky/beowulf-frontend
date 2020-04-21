import React, { Component } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import Title from "./styles/Title";
import ItemStyles from "./styles/ItemStyles";
import PriceTag from "./styles/PriceTag";
import formatMoney from "../lib/formatMoney";
import DeleteItem from "./DeleteItem";
import AddToCart from "./AddToCart";
import User from "../components/User";
import SickButton from "./styles/SickButton";
import AdminView from "./AdminView";
import FeaturedImageDynamic from "./FeaturedImageDynamic";
import getExcerpt from "../lib/getExcerpt";

export default class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };
  render() {
    const { item } = this.props;
    return (
      <User>
        {({ data: { me } }) => (
          <ItemStyles>
            <Link href={{ pathname: "/item", query: { id: item.id } }}>
              <a>
                {item.image && (
                  <FeaturedImageDynamic
                    imageUrl={item.image}
                    alt={item.title}
                    sizes="(min-width: 768px) 45vw, (min-width: 1000px) 400px, 100vw"
                  />
                )}
                <Title>
                  <div>{item.title}</div>
                </Title>
              </a>
            </Link>
            <p>{getExcerpt(item.description, 1)}</p>
            <PriceTag>{formatMoney(item.price)}</PriceTag>
            <AddToCart button={SickButton} id={item.id} />
            {/* <div className="buttonList">
              {me && (
                <AdminView>
                  <Link href={{ pathname: "/update", query: { id: item.id } }}>
                    <a>Edit</a>
                  </Link>
                  <DeleteItem id={item.id}>
                    <a>Delete this Item</a>
                  </DeleteItem>
                </AdminView>
              )}
            </div> */}
          </ItemStyles>
        )}
      </User>
    );
  }
}
