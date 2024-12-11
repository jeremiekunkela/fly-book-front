import styles from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
    const handleChange = (event) => {
        onSearch(event.target.value);
    };

    return (
        <div className={styles.searchBar}>
            <input
                type="text"
                placeholder="Rechercher..."
                onChange={handleChange}
                className={styles.searchInput}
            />
        </div>
    );
}
