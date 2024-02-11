import React, { Fragment, useEffect } from 'react';
import Metadata from './layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { getProducts } from '../actions/productActions';
import Product from './product/Product';
import Loader from './layout/Loader';

const Home = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, products, error, productsCount} = useSelector(state => state.products)
    console.log(loading)
    useEffect(() => {
        if(error){
            return alert.error(error);
        }

        dispatch(getProducts());      
    }, [dispatch, alert, error]);
    
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <Metadata title={'Buy Best Products Online'}/>

                    <h1 id="products_heading">Latest Products</h1>

                    <section id="products" className="container mt-5">
                        <div className="row">
                            { products && products.map(product => {
                                return(
                                    <Product key={product._id} product={product} />
                                )
                            })}                    
                        </div>
                    </section>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Home;