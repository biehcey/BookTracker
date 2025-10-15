import React from 'react'
import BookItem from './BookItem';

function BookList({list, onDelete, onAddFavorite}) {

   
  const handleDelete = (id) => {
    onDelete(id);
  }

  const handleAddFavorite = (item) => {
    onAddFavorite(item);
  }
  return (
    <div>
      {list.map((item) => (
        <BookItem 
        key={item.id}
        pdf={item.accessInfo.pdf.acsTokenLink}
        title={item.volumeInfo.title}
        authors={item.volumeInfo.authors}
        country={item.volumeInfo.language.toUpperCase()}
        listPrice={item.saleInfo.listPrice?.amount ?? 'Free'}
        currency={item.saleInfo.listPrice?.currencyCode} 
        onDelete={() => handleDelete(item.id)}
        onAddFavorite={() => handleAddFavorite(item)}
        /> 
      ))}
    </div>
  )
}

export default BookList;
