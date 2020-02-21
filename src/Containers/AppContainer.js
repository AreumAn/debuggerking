import React from "react";
import Menu from 'Components/Menu';
import ItemList from 'Components/ItemList';
// import { BrowserRouter as Route } from "react-router-dom";
import utils from 'Utils';

class AppContainer extends React.Component {
    state = {
        sections: [],   // BK sections to use top menu
        items: [],      // BK Items to show items
        itemsData: [],  // All BK items
        idMapper: {},   // Mapping item id with section id
    }

    async componentDidMount() {
        let fetchMenu = fetch('/api/menu').then(res => res.json());
        let fetchSection = fetch('/api/sections').then(res => res.json());
        let fetchItem = fetch('/api/items').then(res => res.json());
        try {
            let [
                menusData,
                sectionsData,
                itemsData
            ] = await Promise.all([fetchMenu, fetchSection, fetchItem]);

            // Get data that related with BK
            let idMapper = {};
            const menus = menusData.options.map(x => x._ref);
            const sections = sectionsData.reduce((prev, cur) => {
                if (menus.includes(cur._id)) {
                    prev.push({
                        ...cur,
                        imgSrc: utils.getImagePath(cur.carouselImage.asset._ref),
                    });
                    // Get mapping ids between section and items
                    idMapper[cur._id] = cur.options.map(option => option._ref);
                }
                return prev;
            }, []);

            // Set default items: main page should show section data
            const items = sections;

            this.setState({ sections, idMapper, itemsData, items });
        } catch(err) {
            console.error(err);
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // If the user is on the main menu the elements should be the same as the top navigation bar
        if (!nextProps.match.params.id || nextProps.match.params.id === 'all') {
            return {
                items: prevState.sections,
            };
        }

        // Get items where its id belongs to idMapper[section_id]
        const items = prevState.itemsData
            .filter(item => prevState.idMapper[nextProps.match.params.id].indexOf(item._id) !== -1)
            .map(filteredItem => ({ 
                // To add imgSrc
                ...filteredItem,
                imgSrc: utils.getImagePath(filteredItem.image.asset._ref),
            }));
            
        // To show selected section items
        return { items };
    }

    render() {
        const { sections, items } = this.state;
        return (
            <div>
                <Menu 
                    sections={sections}
                    selectedSection={this.props.match.params.id || null}
                />
                <ItemList
                    items={items}
                />
            </div>
        );
    };
}

export default AppContainer;
