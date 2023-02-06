const express = require('express');
const lodash = require('lodash');
const cors = require('cors');
const Fuse = require('fuse.js');
const axios = require('axios');

const server = express();

server.use(cors());

const url = 'https://api.gcfund.org/v1/projects';
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
        const f = lodash.filter(prev, d => {
          if (d[key] === queryObj[key]) {
            return true;
          }
          return false;
        });
        return f;
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
      if (found.length) {
        filtered = found;
      }
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
