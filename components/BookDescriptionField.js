import { useState } from 'react';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

const BookDescriptionField = ({ book }) => {
  const [description, setDescription] = useState(book ? book.description : '');
  const [selectedTab, setSelectedTab] = useState('write');
  return (
    <div className="container">
      <ReactMde
        value={description}
        onChange={setDescription}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={markdown => Promise.resolve(converter.makeHtml(markdown))
        }
      />
    </div>
  );
};

export default BookDescriptionField;
