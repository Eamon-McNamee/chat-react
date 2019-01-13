import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ListView} from 'antd-mobile';
import Swiper from 'swiper';
import {withRouter} from 'react-router-dom';
import 'swiper/dist/css/swiper.min.css';
import {bindActionCreators} from 'redux';
import * as authActions from '../redux/reduces/auth';
import * as homeActions from '../redux/reduces/home';
import Artiidcle from '../components/article';

let mySwiper;

@connect(
  state => ({auth: state.auth, home: state.home}),
  dispatch => bindActionCreators({...authActions, ...homeActions}, dispatch),
)
class Home extends Component {
  state = {
    bannerLength: 0
  }
  componentDidMount() {
    const {getBanner, getArticle} = this.props;
    getBanner();
    mySwiper = new Swiper('.swiper-container', {
      autoplay: true,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
      },
    });
  }
  componentDidUpdate() {
    this.updateSlides();
  }
  handleLink = (link) => {
    if (link.includes('http')) {
      return window.open(link);
    }
    this.props.history.push(`${link}`);
  }
  updateSlides = () => {
    const {home: {bannerList = []} = {}} = this.props;
    if (bannerList.length !== this.state.bannerLength) {
      mySwiper.updateSlides();
      this.setState({bannerLength: bannerList.length});
    }
  }
  render() {
    const {home: {articleList = [], bannerList = []} = {}} = this.props;
    const row = (rowData, sectionID, rowID) => (
      <div key={rowID} style={{padding: '0 15px'}}>
        1231231231
      </div>
    );
    const {cardList = []} = this.state;
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );
    return (
      <div>
        <div className="swiper-container">
          <div className="swiper-wrapper">
            {bannerList.map((val, index) => (
              <div
                className="swiper-slide banner"
                key={val.bannerurl}
                onClick={() => this.handleLink(val.link)}
              >
                <img
                  src={val.bannerurl}
                  style={{
                    width: '100%',
                    display: 'block',
                  }}
                />
                <p style={{lineHeight: '16px'}}>{val.title}</p>
              </div>
            ))}
          </div>
          <div className="swiper-pagination" />
        </div>
        <Artiidcle />
      </div>
    );
  }
}

export default withRouter(Home);