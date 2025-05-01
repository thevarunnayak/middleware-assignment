import { useState, useEffect } from 'react';
import "./SearchBar.css"
interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [query, setQuery] = useState('');

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            onSearch(query);
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [query, onSearch]);

    return (
        <input
            type="text"
            placeholder="Search logs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className='search-bar'
        />
    );
};

export default SearchBar;
