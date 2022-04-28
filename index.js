import { Client } from "@notionhq/client"
import 'dotenv/config'
import fs from 'fs'

const notion = new Client({auth: process.env.NOTION_KEY})

const databaseId = process.env.NOTION_DATABASE_ID

async function addItem(text){
    try{
        const response = await notion.pages.create({
            parent: { database_id: databaseId },
            properties: {
                'Name' : {
                    type: 'title',
                    title: [
                        {
                            type: 'text',
                            text: {
                                content: 'Tomatoes',
                            },
                        },
                    ],
                },
                'message': {
                    type: 'rich_text',
                    rich_text: [{
                        text: {
                            content: 'Grocery List 1',
                            link: null
                        },
                    }]
                },
                'branch': {
                    select: {
                        name: 'dev-1'
                    }

                }
            },
        });

        console.log(response)
        console.log("Sucess")
    }catch(error){
        console.error(error.body)
    }
}

    
console.log("reading commits.json file")
fs.readFile('./commits.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    let commits = JSON.parse(data)
    for(let i = 0; i < commits.length; i++){
        addItem(commits[i]["message"])
    }
})
