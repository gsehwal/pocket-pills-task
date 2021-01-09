import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import './style.scss';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            error: '',
            items: [],
            selected: [],
            hasMore: false
        };

        this.loadMoreImages = this.loadMoreImages.bind(this);
    }

    componentDidMount() {
        this.loadMoreImages();
    }

    loadMoreImages() {
        let {page, items, selected} = this.state;
        let perPage = Math.floor(window.innerHeight / 400) > 1 ? Math.floor(window.innerHeight / 400) : 2;
        
        axios.get('https://api.unsplash.com/photos?client_id=mQHbDcKdd_Hsje5aQoKnRHToK8OTHE2pYYRUWUxLlVQ&page=' + page + '&per_page=' + perPage ).then(res => {
            console.log(res);
            res.data.forEach(x => {
                selected.push(false);
                items.push(x);
            });
            
            page++;
            this.setState({items, selected, page, hasMore: true, error: null});
        }, err => {
            this.setState({error: err.response.data});
        })
    }

    selectProduct(i) {
        let {selected} = this.state;
        selected[i] = !selected[i];
        this.setState({selected});
    }

    nextPage() {
        let {items, selected} = this.state;
        this.props.history.push({pathname: '/selected', state: {items, selected}});
    }

    render() {
        let {items, selected, hasMore, error} = this.state;
        return (
            <div>
                <div>{error}</div>
                <button className='next-btn' onClick={this.nextPage.bind(this)}>Next</button>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadMoreImages}
                    hasMore={hasMore}
                    threshold={10}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                >
                    <div style={{width: '100%', height: '100%'}}>
                        {items.map((x,i) => (
                            <div key={i} className={selected[i] ? 'product-img selected' : 'product-img'} onClick={this.selectProduct.bind(this, i)} style={{background: 'url('+x.urls.small+')', backgroundSize: 'cover'}}></div>
                        ))} 
                    </div>
                </InfiniteScroll>
            </div>
        )
    }
}

export default Home;