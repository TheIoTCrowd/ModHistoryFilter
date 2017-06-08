# ModHistoryFilter
A filter for the moderator history page on Stack Exchange sites.

The moderator history typically contains a chronological list of recent moderator actions (e.g. user deletion, post closure, mod messages). Often, it's hard to find exactly what you're looking for, or get a handle on exactly how many events of each type are occurring.

This userscript enables you to filter these events. Currently, events are grouped into three categories:

- flag processed
- post actions (closure/reopening, deletion, migration, comment deletion)
- user actions (deletion, mod messages, etc)

All of the above filters contain *subfilters*. By clicking on 'flag processed', you will notice that additional options appear beside the filter, like this:

> [flag processed](https://example.com) ( [helpful](https://example.com) · [declined](https://example.com) )

Selecting 'flag processed' will show **all flags**, and then clicking 'helpful' will limit the filter to show only **helpful flags**.

You may notice that some events show despite having a filter enabled that should exclude them—filters show every event associated with a post that has a matching event. For example, if a post was flagged and closed, and you set the filter to 'closed', both events will show.

There is currently no way to combine filters. This may be considered if there is sufficient need for it.

## Installing

[Direct Install Link](https://github.com/TheIoTCrowd/ModHistoryFilter/raw/master/filter.user.js) (requires [Tampermonkey](https://tampermonkey.net/))
