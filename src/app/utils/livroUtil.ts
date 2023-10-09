import { Item } from './../models/interfaces';
import { Livro } from 'src/app/models/interfaces';

export function converteItemParaLivro(item: Item): Livro {
  return {
    title: item.volumeInfo?.title,
    authors: item.volumeInfo?.authors,
    publisher: item.volumeInfo?.publisher,
    publishedDate: item.volumeInfo?.publishedDate,
    description: item.volumeInfo?.description,
    previewLink: item.volumeInfo?.previewLink,
    thumbnail: item.volumeInfo?.imageLinks?.thumbnail,
  };
}
