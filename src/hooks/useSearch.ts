import { useState, useMemo } from 'react';

export const useSearch = <T extends Record<string, any>>(
    data: T[],
    searchFields: (keyof T)[],
    initialSearch = ''
) => {
    const [search, setSearch] = useState(initialSearch);

    const filteredData = useMemo(() => {
        if (!search.trim()) return data;

        const value = search.toLowerCase();
        return data.filter((item) =>
            searchFields.some((field) =>
                String(item[field]).toLowerCase().includes(value)
            )
        );
    }, [data, search, searchFields]);

    return {
        search,
        setSearch,
        filteredData,
    };
};