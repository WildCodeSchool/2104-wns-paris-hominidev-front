# PYGMA.LINK - Folders structure & nomenclatures

## Folders structure
|-- README.md  
|-- project conf files  
|-- **public** *contains extension core files*  
|-- **src** *contains apps source files*  
&nbsp;&nbsp;&nbsp;|-- **assets** *(common assets (images, fonts...)*)  
&nbsp;&nbsp;&nbsp;|-- **1 folder per extension slot** *(option, action, script content...)*  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- **assets** *(specific assets)*  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- **pages** *(top level a display)*  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- **fctComponents** *(specific atomic components with no display)*  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- **uiComponents** *(specific components with display)*  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- **styles** *((s)css files))*  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- **tests** *(test scripts)*  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- entry.tsx *(entry point)*  
&nbsp;&nbsp;&nbsp;|-- **fctComponents** *(common atomic components with no display)*  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- constants.tsx
&nbsp;&nbsp;&nbsp;|-- **uiComponents** *(common atomic components with display)*  

## Nomenclatures
Inside an extension slot folder, all file must respect the following naming convention :

    [theme].[whateveryouwant].[ext]

The corresponding test files must be : 

    [theme].[whateveryouwant].[test].[ext]
