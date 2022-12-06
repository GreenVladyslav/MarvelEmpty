import { Component } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelServices';

import './charList.scss';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError)        
    }

    onCharListLoading = () => {
        this.setState({
            loading: true
        })
    }

    onCharListLoaded = (charList) => {
        this.setState({
            charList,
            loading: false,
            error: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }
    // char__item_selected
    renderItem(arr) {
        const elements = arr.map(item => {
            const {id, thumbnail, name} = item

            const imageNotFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
            const imgStyle = thumbnail === imageNotFound ? {objectFit: 'contain'} : {objectFit: 'cover'};

            return (
                <li className="char__item"
                    key={id}
                    onClick={() => this.props.onSelectedChar(id)}>
                    <img src={thumbnail} alt={name} style={imgStyle}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        })

        return (
            <ul className="char__grid">
                {elements}
            </ul>
        )
    }

    render() {

        const {charList, loading, error} = this.state

        const elements = this.renderItem(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(error || loading) ? elements : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;