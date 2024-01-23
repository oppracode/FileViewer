This app was made to check and modify(delete files) a dropbox account.
Important note: an API access key for a dropbox account should be entered into an .env file. Dropbox account should have permission for writing files.
This app was built using expo, so getting it running should not be any different from any other expo app. Clone this repository, npm install and then build the app(npx expo start, 
for example) as you desire. Expo was chosen instead of Native CLI, because I find it easier to develop with expo. While it may create some additional issues, such as some native 
libraries not being supported, it also streamlines and simplifies app testing.
This app was tested with my own API access token, and it likely won't be valid when you start testing the app, so feel free to change it to your own.

App.tsx - The main entry point of this application. It uses NavigationContainer to wrap the Toolbar component.
store.tx - File that configures Redux store that is being used to make API calls and display 'loading'icon while the app is waiting for response.
loadingSlice.ts - File that manages loading state. This state is used only to display loading icon on the screen.
dropboxSlice.ts - File that contains Redux slice for handling Dropbox-related functionality, including fetching and deleting files.
Toolbar.tsx - Component that displays a horizontal lists of buttons, these buttons are presently just stubs.
FileModal.tsx - Component that provides a modal for performing actions on a selected file, such as deleting it. Also contains FileModalAction component that represents actions within
a modal, such as closing the modal.
FileCard.tsx - Component that displays information about a file and provides a long-press action to open a modal, also provides a button(three dots) to open the same modal.
FileArea.tsx - Component that is a container for displaying our selection of files, both files and folders. It fetches dropbox files from Redux store and renders them using FileCard.
DropboxItem.tsx - Component that serves as a top-level container for the FileArea, initiates the fetching of files.
NoFeaturesMessage.tsx - Component that displays a message about features being still in development, when user clicks toolbar buttons.
NavigationTab.tsx - Component that is responsible for our Screen Navigation, bottom tab navigation to be precise. Note that all buttons except 'Files'leads to a stub screen.
FileViewerScreen.tsx - Component, a screen, that is responsible for our main screen. All the other components, except DevelopmentScreen, start from here.
DevelopmentScreen.tsx - Component, a screen, that is shown when user clicks any navigation tab except 'Files'. Serves as a stub screen.
