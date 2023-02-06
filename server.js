const express = require('express');
const lodash = require('lodash');
const cors = require('cors');
const Fuse = require('fuse.js');
const axios = require('axios');

const server = express();

server.use(cors());

const url = 'https://api.gcfund.org/v1/projects';

const filterNestedCountries = (allData, value) => {
  return lodash.filter(allData, d => {
    const found = lodash.filter(
      d['Countries'],
      ({ Region }) => Region === value
    );
    if (found.length) {
      return true;
    }
    return false;
  });
};

const filterNestedResultArea = (allData, value) => {
  return lodash.filter(allData, d => {
    const found = lodash.filter(d['ResultAreas'], ({ Area, Value }) => {
      const isMatch = Area === value;
      const hasValue = !!Number(Value.replace('%', ''));
      return isMatch && hasValue;
    });
    if (found.length) {
      return true;
    }
    return false;
  });
};

const filterOthers = (allData, key, value) => {
  return lodash.filter(allData, d => {
    if (d[key] === value) {
      return true;
    }
    return false;
  });
};

server.get('/all', async (req, res) => {
  const db = await axios({
    url,
    method: 'get'
  });
  let filtered = db.data;
  if (!lodash.isEmpty(req.query)) {
    // filers
    const page = Number(req.query.page);
    const keyword = req.query.keyword;

    const queryObj = lodash.omit(req.query, ['page', 'keyword']);

    if (!lodash.isEmpty(queryObj)) {
      filtered = Object.keys(queryObj).reduce((prev, key) => {
        if (key === 'Countries') {
          return filterNestedCountries(prev, queryObj[key]);
        } else if (key === 'ResultAreas') {
          return filterNestedResultArea(prev, queryObj[key]);
        } else {
          return filterOthers(prev, key, queryObj[key]);
        }
      }, filtered);
    }

    if (keyword) {
      const options = {
        includeScore: true,
        minMatchCharLength: 2,
        threshold: 0.0,
        keys: [
          'ProjectsID',
          'ApprovedRef',
          'BoardMeeting',
          'ProjectName',
          'Theme',
          'Sector',
          'Size',
          'RiskCategory',
          ['Countries', 'CountryName'],
          ['Countries', 'Region'],
          ['Entities', 'Name'],
          ['Entities', 'ESS']
        ]
      };
      const fuse = new Fuse(filtered, options);
      const found = fuse.search(keyword);
      filtered = found;
    }

    // size
    const limit = 10;
    const sliced = lodash.slice(filtered, page, page + limit);
    return res.send(sliced);
  }

  res.send(filtered);
});

server.get('/project/:id', async (req, res) => {
  const db = await axios({
    url,
    method: 'get'
  });
  const found = lodash.find(
    db.data,
    ({ ApprovedRef }) => ApprovedRef == req.params.id
  );
  res.send(found);
});

server.listen(3000);
