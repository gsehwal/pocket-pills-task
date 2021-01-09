import React from 'react';
import _get from 'lodash.get';

class Selected extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: _get(props, 'history.location.state.items', []),
            selected: _get(props, 'history.location.state.selected', []),
            itemsToShow: []
        };
    }

    componentDidMount() {
        let {items, selected, itemsToShow} = this.state;
        items.forEach((x,i) => {
            if(selected[i]) {
                itemsToShow.push(x);
            }
        });
        this.setState({itemsToShow});
    }

    render() {
        let {itemsToShow} = this.state;
        return (
            <div style={{width: '100%', height: '100%'}}>
                {itemsToShow.map((x,i) => (
                    <div key={i} className='product-img' style={{background: 'url('+x.urls.small+')', backgroundSize: 'cover'}}></div>
                ))} 
            </div>
        )
    }
}

export default Selected;