# Dick's Sporting Goods demo
https://www.dickssportinggoods.com/s/baseball-softball-services

## Environments
- Preview: https://main--{repo}--{owner}.hlx.page/
- Live: https://main--{repo}--{owner}.hlx.live/

## Installation

```sh
npm i
```

## Tests

```sh
npm tst
```

## Local development

1. Create a new repository based on the `helix-project-boilerplate` template and add a mountpoint in the `fstab.yaml`
1. Add the [helix-bot](https://github.com/apps/helix-bot) to the repository
1. Install the [Helix CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/helix-cli`
1. Start Franklin Proxy: `hlx up` (opens your browser at `http://localhost:3000`)
1. Open the `{repo}` directory in your favorite IDE and start coding :)

### Charity's steps
1. copy + paste into Word doc https://www.dickssportinggoods.com/s/baseball-softball-services
2. add 3 dashes in a row to create an HTML section between obvious sections
3. Add blocks (tables) based on the boilerplate cards, columns, hero, etc and add a section metadata at the end of each section that has a style name
4. add some alt text to images
5. Edit footer.doc, replace boilerplate info with what I pasted in from the live site
6. Edit nav.doc, replace with all seen in the live site. This navigation is exceptionally large, so I am typing out some placeholder notes, and creating lots of sections as I go along.
7. Take inventory of live site fonts, font sizes, breakpoints, etc and create the base CSS
8. Create needed blocks to support the content structure
