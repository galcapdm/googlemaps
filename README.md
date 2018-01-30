# spotting-maps

Javascrirpt/PHP/MySQL app for use in radio comms spotting exercises.

This application will provide the ability to define a location to use as a centre
for observations which will then be reported on by way of formulating and
then transmitting a properly formatted RAFAC radio message.

Edit
Ability to set a map location using Google Maps as the source. Browse, zoom on all
of Google Maps locations until desired location is selected.  Then set this as the
centre point of the map (by clicking on the desired map point).

"Observations" can then be added associated with that location.  "Observations" are
limited to images stored in the images/observations folder.  Filenames should be
reporting name .filetype i.e. mh1345a1.jpg (case is not important).  A time
supplied in 24hrs format (but can be configured to be displayed in AM/PM for added
"complexity" to formulating the message), a bearing in degrees and a quantity of the
observed vehicle/object can then be defined as an "observation".

More.....

Some google maps api stuff (public dev key)
Development API key - AIzaSyCPb8byuKmAvWrtZUuTDx48N_yINnIjRkQ