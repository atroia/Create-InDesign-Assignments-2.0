# Create-InDesign-Assignments-2.0

I work in publishing and have spent a lot of time working with assinments in InDesign/Incopy. One of the things that bugs me is how long it takes to create them, especially if you have a document with a lot of chapters or sections. So I have been trying to work my way towards a script that will speed up my workflow and save me time when it comes to creating assignments for InDesign/InCopy.

First off, this script only creates the ICMA files and populates the top level of your Assignments window in InDesign. To add your content/stories to create the ICML files, you still have to go throught your document and add them by hand.


## Create Assignments from a list

Lets start with this TOC from Lewis Carrol's *Alice in Wonderland*:

<p align="center">
<img width="400" alt="Alice in Wonderland TOC in InDesign with no selected text" src="https://github.com/atroia/Create-InDesign-Assignments-2.0/assets/1234174/aa8d39b8-7b00-44c3-94a0-e7400342f409">
</p>
d
By not selecting any text and running the script, the script will assume you want to create your assignments from a list that you have made and will copy/paste into the text field

<p align="center">
<img width="400" alt="Create Assignments from List window" src="https://github.com/atroia/Create-InDesign-Assignments-2.0/assets/1234174/9f43af25-160b-4d53-a17f-242a1ac91f33">
</p>

## Create Assignments from Selection

Another option for creating assignments is to select the text in your TOC like so 

<p align="center">
<img width="400" alt="Alice in Wonderland TOC in InDesign with selected text" src="https://github.com/atroia/Create-InDesign-Assignments-2.0/assets/1234174/e52c1676-8b68-45e4-adf9-6b450f0e6e2d">
</p>

The script will open a selection dialog that allows you to choose from a list of three items:

<p align="center">
<img width="300" alt="Create Assignments from selection dialog" src="https://github.com/atroia/Create-InDesign-Assignments-2.0/assets/1234174/3bfca2ed-4505-492e-862e-8c732ea0a5ce">
</p>

### Compile from Selection

This option does what it says, it takes your TOC selection and will format and compile the assignments. 

*Currently this only works for tradebook style TOCs so if you have sections in your book or anything besides "Book" or "Chapter" to designate the chapters in your book, it will not work correctly*

### Export Formatted List to File

This option will export your TOC selection to a .txt file and not compile assignments. 

The reason for this is if you need to make some tweaks to your TOC selection before you create assignments. Once you have your list the way you want it, unselect the text in your TOC and run the script so that the *Create Assignments from List* dialog comes up and paste your list into the text field and click OK. 

<p align="center">
<img width="400" alt="The TOC selection formatted and exported to a text file" src="https://github.com/atroia/Create-InDesign-Assignments-2.0/assets/1234174/3c9208c8-eedc-4cea-b547-73fc9c983641">
</p>

### Export Unfromatted List to File 

This option will export your TOC selection as-is to a text file and not compile assignments.

This is also so that you can tweak or do extensive formatting to your TOC list. Like the *Export Formatted List to File* option, once you have your list the way you want it, unselect the text in your TOC and run the script so that the *Create Assignments from List* dialog comes up and paste your list into the text field and click OK.

<p align="center">
<img width="400" alt="The TOC selection unformatted and exported to a text file" src="https://github.com/atroia/Create-InDesign-Assignments-2.0/assets/1234174/8b166790-b9de-4e6f-b322-b1a20bb84d6b">
</p>

## Compiled Assignments

Once you have your TOC assignments made it will populate the Assignments window with random colors for each assignment.

<p align="center">
<img width="300" alt="InDesign's Assignments window with create assignments" src="https://github.com/atroia/Create-InDesign-Assignments-2.0/assets/1234174/fdf4d354-9ee5-4468-99ca-af0e187a914e">
</p>

And your folder will contain an Assignments folder and all your ICMA files

<p align="center">
<img width="400" alt="Document folder with document's assignments folder created and filled with ICMA assignment files" src="https://github.com/atroia/Create-InDesign-Assignments-2.0/assets/1234174/bbab9e3f-0058-4ebd-867f-aacf15e6ca43">
</p>

Again, this does not assign your content to these assignments and create ICML files, you have to now go through your document and assign the content to your created assignments. When you do assign your content to the assignments, InDesign will create a Content folder within the Assignments folder and will function natively by putting your content within that folder as you assign it.
