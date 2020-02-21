import React from "react";
import PropTypes from "prop-types";
import styles from './styles.module.css';

const ItemList =({ items }) => {
    return (
        <div className={styles.itemListContainer}>
        { 
            items.map((item, idx) => {
                return (
                    <div className={styles.itemContainer} key={idx}>
                        <img className={styles.itemImg} src={item.imgSrc} alt ={item.name.en}/>
                        <div className={styles.itemTitle}>{item.name.en}</div>
                    </div>
                );
            }) 
        }
        </div>
    );
}

ItemList.propTypes = {
    items: PropTypes.array
};

export default ItemList;
