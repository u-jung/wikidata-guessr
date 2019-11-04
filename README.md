#Wikidata Guessr
===============

Guess the locations of random Wikidata items!

Based on [whereami](https://github.com/webdevbrian/whereami), a GeoGuessr reimplementation by [Brian Kinney](http://www.thebriankinney.com/).

This copy has been forked from [https://github.com/blinry/morr.cc] with an online demo at [http://guessr.morr.cc/].

License: GPLv3+
===============


#What's the point?

Thanks to [Wikidata](https://www.wikidata.org) it is possible to retrieve images from [Wikimedia Commons](https://commons.wikimedia.org) together with the corresponding information, such as the type of object displayed or the geo coordinates. The result was a game.

Five randomly selected images are displayed one after the other. It is to be guessed where exactly these pictures were taken. The position is marked on the map. Afterwards the program compares the measured position with the actual position. The closer the two are to each other, the more points there are.

In the selection field at the bottom left, the class of the objects to be displayed can be displayed in a list.

#Why am I not offered a picture class xyz?

Thank you very much for the question. Here is where you enter the stage! Feel free and change the code according to your own wishes! 
(A hint: The image classes are defined in the file *restrictions.js*)

# Installation

The script works on the client side in the browser. All you have to do is download the package, unpack it and then run the file *index.html*.