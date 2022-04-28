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
                title: {
                    title: [
                        {
                            "text" : {
                                "content" : text
                            }
                        }
                    ]
                }
            }
        })

        console.log(response)
        console.log("Sucess")
    }catch(error){
        console.error(error.body)
    }
}

    
addItem("Test entry")
console.log("command line args", process.argv)
console.log("reading commits.json file")
fs.readFile('./commits.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
})
