# Racines

*Racines* is a small tool to produce a page of links, a kind of *rhizome*. It is useful when you can share only one link but you want to share a lot of links... It can also be a very minimalist one page website.

*Racines* uses *Pandoc* to produce only one page of links where everything (CSS, JavaScript, and the images as data URI schemes) is self-contained (thanks to the *Pandoc* option `--self-contained`).

## Dependencies

* [Pandoc](http://pandoc.org/)

Optional: 

* SSH & Rsync
* NPM and Gulp (to test the page; everything necessary with `npm i`)
* Git (if you want to use something like Gitlab Pages)

## Makefile commands & variables

### Commands

* `make html` to make the HTML page
* `make ssh` to send the existing page to a remote place with SSH and Rsync 
* `make deploy` to deploy the page (make html %% make ssh)

### Variables

* `MEXT`: file extension (in the directory `text`)
* `USER`: username for SSH (only for `make ssh`)
* `SRC`: the files for the final webpage
* `NAME`: the name of the final webpage (by default: the name of the current directory)
* `HOST`: the remote host for SSH (only for `make ssh`)
* `DIR`: the remote directory for SSH (only for `make ssh`)

## Metadata blocks

Every variable can be commented with `#` at the beginning of the line. You can put some HTML in these variables.

In the file `text/informations.md` (a YAML metadata block between `---` in a Pandoc-flavored Markdown file) :

```yml
title: "The title"
author: "Author"
date: "2019"
description: "a description here <a href='#' target='_blank'>a link</a> #hashtag or @tagyou"
lang: "fr"

logo-top: "<img src='template/img/logo-top.jpg'>"
logo-bottom: "Ü"

color-background: "#fff (color of the background)"
color-static: "#000 (color of the text)"
color-dynamic: "#f00 (color of the links and the borders)"
border-width: "4px (width of the borders)"

links:
- text: "The text of the link, with possible<br><em>HTML tag</em>"
  url: "https://abrupt.ch/"
- text: "Etc."
  url: "https://irl.st"
```

In the file `text/social.md` :

```yml
- network: '(the name of the network)'
  path: '<path d="..."/> (the path tag only for the SVG logo)'
  url: '(the URL of the network)'
- network: 'Gitlab'
  path: '<path d="M23.955 13.587l-1.342-4.135-2.664-8.189c-.135-.423-.73-.423-.867 0L16.418 9.45H7.582L4.919 1.263C4.783.84 4.185.84 4.05 1.26L1.386 9.449.044 13.587c-.121.375.014.789.331 1.023L12 23.054l11.625-8.443c.318-.235.453-.647.33-1.024"/>'
  url: 'https://gitlab.com/cestabrupt'
- network: 'Mastodon Etc.'
  path: '<path d="M23.193 7.879c0-5.206-3.411-6.732-3.411-6.732C18.062.357 15.108.025 12.041 0h-.076c-3.068.025-6.02.357-7.74 1.147 0 0-3.411 1.526-3.411 6.732 0 1.192-.023 2.618.015 4.129.124 5.092.934 10.109 5.641 11.355 2.17.574 4.034.695 5.535.612 2.722-.15 4.25-.972 4.25-.972l-.09-1.975s-1.945.613-4.129.539c-2.165-.074-4.449-.233-4.799-2.891a5.499 5.499 0 0 1-.048-.745s2.125.52 4.817.643c1.646.075 3.19-.097 4.758-.283 3.007-.359 5.625-2.212 5.954-3.905.517-2.665.475-6.507.475-6.507zm-4.024 6.709h-2.497V8.469c0-1.29-.543-1.944-1.628-1.944-1.2 0-1.802.776-1.802 2.312v3.349h-2.483v-3.35c0-1.536-.602-2.312-1.802-2.312-1.085 0-1.628.655-1.628 1.944v6.119H4.832V8.284c0-1.289.328-2.313.987-3.07.68-.758 1.569-1.146 2.674-1.146 1.278 0 2.246.491 2.886 1.474L12 6.585l.622-1.043c.64-.983 1.608-1.474 2.886-1.474 1.104 0 1.994.388 2.674 1.146.658.757.986 1.781.986 3.07v6.304z"/>'
  url: 'https://mamot.fr/\@cestabrupt'
```

## Modifications

If you want to modify the template and if you use Gulp, you can work with the files in the folder `src`; everything will be compressed (images and code).

If you're not working with Gulp, you can work directly with the files in `template`. The CSS (the same for JS) is compressed in `template`, so you should copy and paste the files of `template/src/css/import/` in `racines.css` and modify the code as you wish.

## GitLab Pages or GitHub Pages

You can host this *Racines* page on Gitlab Pages or GitHub Pages with the power of GitLab CI (see [.gitlab-ci.yml](.gitlab-ci.yml)) or GitHub Actions (see [main.yml](.github/workflows/main.yml)) ; it will run Pandoc automatically. You can consenquently edit your *Racines* page directly on GitLab or GitHub by modifying the files in the `text` folder.

## Examples

* with [GitLab Pages](https://irrealitas.gitlab.io/racines)
* or with [GitHub Pages](https://irrealitas.github.io/racines/)
* the *Racines* of our friends [Abrüpt](https://abrupt.ch/www)

## Icons

The SVG icons come from [Simple Icons](https://simpleicons.org/) (CC-0).

## License

MIT License - see [LICENSE.md](LICENSE.md).
