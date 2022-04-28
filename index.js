import { Client } from "@notionhq/client"
import 'dotenv/config'

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
console.log(process.argv)
