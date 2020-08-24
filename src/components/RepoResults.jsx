import React from 'react';
import { useSelector } from 'react-redux';
import RepoTable from './RepoTable';

const RepoResults = () => {
  const { error, loading, repos } = useSelector(state => state.repoSearch);

  return (
    <div className="RepoResults">
      {error ? <h6> Error loading repos !</h6> : ''}
      {loading ? <p>Searching Github...</p> : ''}
      {repos.items
        ? repos.items.length > 0 
          ? <div>
            <h6>Search Results: </h6>
              <RepoTable repos={repos.items} options={{showAvatar: true}}/>
            </div>
          : <p>No results. Try a different search.</p>
        : ''}
    </div>
  );
};

export default RepoResults;
