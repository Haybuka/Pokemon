# Pokemon - Catch Them all

This is a personal project/challenge that seeks to use concept i've learnt to create "something that works".
It has helped to improve my coding skills by combinining the following : 
  1. React Js
  2. React Query
  3. Framer Motion
  4. Use of Context
  5. React Responsive Design
  6. Working with REST Api
  7. Tailwind Css (will refactor to).
  8. React Router
  9. Code Documentation (Layout copied from frontendMentor)
  10. Local storage - handled some refresh problem of pages and also cases of network connectivity
  11. Some Skill i dont know about, that maybe caught your attention ... LOL
  

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)



## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Open a new route based on a pokemon clicked
- cycle through a list of pokemons
- see pokemon details after a pokemon has been selected


### Screenshot

![](./screenshot.png)

### Links

- Solution URL: [Github](https://github.com/Haybuka/Pokemon)
- Live Site URL: [Netlify](https://pokemun.netlify.app)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Desktop-first workflow
- [React](https://reactjs.org/) - JS library
- Framer Motion
- React Query
- React Router
- Pokemon Api 



### What I learned

Use this section to recap over some of your major learnings while working through this project. Writing these out and providing code samples of areas you want to highlight is a great way to reinforce your own knowledge.

To see how you can add code snippets, see below:


```js
  // using React Query
  // first - wrap your app with the QueryClientprovider      
        const queryClient = new QueryClient ()

        <QueryClientProvider client={queryClient}>
          <Pokemon />
        </QueryClientProvider>
  // secondly - create your hook (use an array to pass in parameters for your url, and query key to access them)
    const {data,status} = useQuery(['encounter',url],fetchEncounter)
  // Then, Pass in your function.
   async function fetchEncounter ({queryKey}){
        const res = await fetch(`${queryKey[1]}`)
        return res.json()
    }
```

If you want more help with writing markdown, we'd recommend checking out [The Markdown Guide](https://www.markdownguide.org/) to learn more.

**Note: Delete this note and the content within this section and replace with your own learnings.**

### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

### Useful resources

- [Pokemon Api](https://pokeapi.co/) - Pokemon Api, well, resource was fetched from this route and i have to say, the documentation did help to get around (just careful not to be lost).
- [Framer Motion](https://www.framer.com/motion/) - I have to say, i didnt expect an animation library to be easy to grasp and also the documentation easier to follow. You'd definetely enjoy reading the documentation made for framer motion, it really helped to get started.
- [React Query](https://react-query.tanstack.com/)
- [React Router](https://reactrouter.com/)


NOTE - you might have issues loading up react query with current react, as query needs a RV16 to properly function (as at April,2022).


## Author

- Website - [Ndulue Paschal](chukwu.netlify.app/)
- LinkedIn - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@haybukarh](https://www.twitter.com/haybukarh)

