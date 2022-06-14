const {Client} = require('@elastic/elasticsearch');
const client = new Client({node:'http://localhost:9200/'});

async function createTitle () {
    const {response} = await client.create({
        index: 'titles',
        id: 1,
        body: {
            title: 'My first title',
            author: 'Haikal',
            date: new Date() 
        }
    });
}

// createTitle().catch(console.log);

async function getTitle () {
    const {body} = await client.get({
        index: 'titles',
        id: 1
    })

    console.log(body);
}

// getTitle().catch(console.log);

async function updateDoc () {
    const {response} = await client.update({
        index: 'titles',
        id: 1,
        body: {
            doc: {
                title: 'Tanjong Pagar'
            }
        }
    })
}

// updateDoc().catch(console.log);

// getTitle().catch(console.log);

const titles = [{
    id: 2,
    title: 'Persib Bandung',
    author: 'Bandung',
    date: new Date()
},
{
    id: 3,
    title: 'Persija Jakarta',
    author: 'Jakarta',
    date: new Date()
},
{
    id: 4,
    title: 'Persebaya Surabaya',
    author: 'Surabaya',
    date: new Date()
},
{
    id: 5,
    title: 'Arema FC',
    author: 'Mbuh yang Mana',
    date: new Date()
}];

const body = titles.flatMap((doc, index) => [
    { index: {
        _index:'titles',
        _id:index+1 }
    },
        doc
    ]);

async function createTitles() {
    const {response} = await client.bulk({
        body:body,
        refresh: true
    })

    if (response) {
        console.log(response.errors);
    }
}

// createTitles().catch(console.log);

async function getTitles() {
    const {body} = await client.get({
        index: 'titles',
        id: 3
    })

    console.log(body);
}

async function countTitles() {
    const {body} = await client.count({
        index: 'titles'
    })

    console.log(body)
}

// getTitles().catch(console.log);

// countTitles().catch(console.log);

///fulltext search
async function searchTitles() {
    const {body: response} = await client.search({
        index: 'titles',
        body: {
            query: {
                match: {
                    title: 'Persib Bandung'
                }
            }
        }
    });

    console.log(response);
}

searchTitles().catch(console.log);