# PYGMA.LINK - Folders structure & nomenclatures

## Folders structure
|-- README.md  
|-- project conf files  
|-- build *contain the extension not packed*  
|-- **public** *contains extension core files*  
|-- **src** *contains apps source files*  
&nbsp;&nbsp;&nbsp;|-- **assets** *(common assets (images, fonts...)*)  
&nbsp;&nbsp;&nbsp;|-- **parts** *(option, action, script content...)*  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- **1 folder per extension part** 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- **assets** *(specific assets)*  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- **pages** *(top level a display)*  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- **compFct** *(specific atomic components with no display)*  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- **compUi** *(specific components with display)*  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- **styles** *((s)css files))*  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- **tests** *(test scripts)*  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- entry.tsx *(entry point)*  
&nbsp;&nbsp;&nbsp;|-- **compFct** *(common atomic components with no display)*  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- constants.tsx\
&nbsp;&nbsp;&nbsp;|-- **compUi** *(common atomic components with display)*  

## Nomenclatures
Inside an extension slot folder, all file must respect the following naming convention :

    [theme].[whateveryouwant].[ext]

The corresponding test files must be : 

    [theme].[whateveryouwant].[test].[ext]
