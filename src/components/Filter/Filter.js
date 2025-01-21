
import styles from './Filter.module.css'
import { useDispatch, useSelector } from 'react-redux';

import { actionFilter, filterSelector } from '../../redux/reducers/filterReducer'

let price = 0;
export const Filter = () => {
    const categoriesList = [
        "men's clothing",
        "women's clothing",
        'jewelery',
        'electronics',
    ];
    const dispatch = useDispatch();


    const { selectedCategory } = useSelector(filterSelector)




    const handlePriceChange = (e) => {
        price = Number(e.target.value); // Convert to a number for accurate comparison
        dispatch(actionFilter.setPrice(price))
    }


    const handleCategoryChange = (category) => {
        const updatedCategories = selectedCategory.includes(category) ? selectedCategory.filter((cat) => cat !== category) : [...selectedCategory, category];
        dispatch(actionFilter.setSelectedCategory(updatedCategories))
    }

    return (
        <div className={styles.filterContainer}>
            <h3 className={styles.title}>Filter</h3>
            <div className={styles.priceFilter}>
                <label>Price:
                    {price}
                </label>
                <input
                    type="range"
                    min="0"
                    max="1000"
                    value={price}
                    onChange={handlePriceChange}
                    className={styles.slider}
                />
            </div>
            <div className={styles.categoryFilter}>
                <h4>Category</h4>
                {categoriesList.map((category) => (
                    <div key={category} className={styles.checkboxContainer}>
                        <input
                            type="checkbox"
                            id={category}
                            value={category}
                            // checked={categoriesList.includes('electronics')}
                            onChange={() => handleCategoryChange(category)}
                        />
                        <label htmlFor={category}>{category}</label>
                    </div>
                ))}
            </div>
        </div>
    )
}
