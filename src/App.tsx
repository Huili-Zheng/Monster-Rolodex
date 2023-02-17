import { useState, useEffect,ChangeEvent } from 'react'

import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/seach-box/search-box.component';


import { getData } from './util/data.util';

export type Monster = {
  id: string;
  name: string;
  email: string;
}

const App = () => {
  const [searchField, setSearchField] = useState(''); // [value, setValue]
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [filteredMonsters, setFilterMonsters] = useState(monsters);
  const [title, setTitle] = useState('');

  useEffect(() => {
    // fetch('https://jsonplaceholder.typicode.com/users')
    //   .then((response) => response.json())
    //   .then((users) => setMonsters(users));

    const fetchUsers = async () => {
      const users = await getData<Monster[]>('https://jsonplaceholder.typicode.com/users')
      setMonsters(users)
    }
    fetchUsers();
  }, [])

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilterMonsters(newFilteredMonsters);

  }, [monsters, searchField]);


  const onSearchChange = (event: ChangeEvent<HTMLInputElement>):void => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setTitle(searchFieldString);
  };


  return (
    <div className='App'>
      <h1 className='app-title'>{title}</h1>
      <SearchBox
        className='monsters-search-box'
        placeholder='search monsters'
        onChangeHandler={onSearchChange}
      />
      <br />
      <SearchBox
        className='title-search-box'
        placeholder='set title'
        onChangeHandler={onTitleChange}
      />
      <CardList monsters={filteredMonsters} />
    </div>
  )
}

export default App;
