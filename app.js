
  const express = require('express');
  const app = express();
  //const bodyParser = require('body-parser');

  

   const entries = [
   {
    id: 1,
    title: "My First Diary post",
    content:"Growth mindset, is the willingness to learn"
  },
  {
    id: 2,
    title: "Fixed mindset",
    content: "Fixed mindset is the unwillingness to learn and improve"
  },
  {
    id: 3,
    title: "The power of thought",
    content: "As a man thinketh in his mind, so is He. This means a man is a product of His dominant thought."
  }
  ];



  app.use(express.json());

  app.get('/',(req, res)=> {
    res.send('Hello world');
  })

  app.get('/entries', (req, res) => {
    res.status(200 ).send(entries);0
  })
  /*app.get('/entries/:id', (req,res)=> {

  }*/
  app.post ('/entries', (req, res)=>{
    if (!req.body.title || !req.body.content){
      // 400 Bad Request
      res.status(400).send('title or content field required')
      return;
    }
    const entry = {
      id: entries.length + 1,
      title: req.body.title,
      content: req.body.content
    };
    entries.push(entry);
    res.send(entry);
      });

  app.put('/entries/:id', (req, res)=>{
        // look up the entry
    const entry =entries.find(e => e.id === parseInt(req.params.id));
    if(!entry) res.status(404).send('The Entries with the given ID was not found');

    entry.title= req.body.title;
    entry.content=req.body.content;
    res.send(entry)
  });
   

   app.delete('/entries/:id', (req, res)=>{
    // look up the entry
    const entry =entries.find(e => e.id === parseInt(req.params.id));
    // Not existing, return 404 status
    if(!entry) res.status(404).send('The Entries with the given ID was not found');
   const index = entries.indexOf(entry);
   entries.splice(index, 1);

   res.send(entry);
      })



  const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}....`));