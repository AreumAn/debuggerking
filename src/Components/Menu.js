import React from "react";
import PropTypes from "prop-types";
import { NavLink } from 'react-router-dom';
import Slider from "react-slick";
import styles from './styles.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Menu = ({ sections, selectedSection }) => {
    // To use react-slick
    const settings = {
        className: "customSlide",
        infinite: false,
        centerPadding: "60px",
        slidesToShow: 4.5,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 320,
                settings: { slidesToShow: 1, slidesToScroll: 1, infinite: false }
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 4, slidesToScroll: 4, infinite: false }
            },
        ]
    };

    return (
        <div className={styles.topNavContainer}>
            <div className={styles.topMenuList}>
                <div className={styles.topLogo}>
                    <NavLink to="/section/all" activeClassName={styles.activeLogo}>
                        <img className={styles.topMenuImg} src="/images/logo.png" alt="logo" />
                        <div className={styles.topMenuTitle}>menu</div>
                    </NavLink>
                </div>
                <div className={styles.topMenus}>
                <Slider {...settings}>
                {
                    sections.map(section => {
                        let menuItem;
                        if (selectedSection === section._id) {
                            // To prevent click same menu, it is where the user is on top menu
                            menuItem = (
                                <div className={styles.activeMenu}>
                                    <img className={styles.topMenuImg} src={section.imgSrc} alt={section.name.en} />
                                    <div className={styles.topMenuTitle}>{section.name.en}</div>
                                </div>
                            );
                        } else {
                            menuItem = (
                                <NavLink to={`/section/${section._id}`} activeClassName={styles.activeMenu}>
                                    <img className={styles.topMenuImg} src={section.imgSrc} alt={section.name.en} />
                                    <div className={styles.topMenuTitle}>{section.name.en}</div>
                                </NavLink>
                            );
                        }

                        return (
                            <li className={styles.topMenuBox} key={section._id}>
                                {menuItem}
                            </li>
                        );
                    })
                }
                </Slider>
                </div>
            </div>
        </div>
    );
}

Menu.prototype = {
    sections: PropTypes.array,
    selectedSection: PropTypes.string
}

export default Menu;
