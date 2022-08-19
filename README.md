# kms-sose22-grp1

### Getting Started

1. First, install all dependencies packages from the package.json :

```bash
npm install
```


2. Next, checkt if ```Recompile on changes``` is checked. 
   - You will find it under ```Webstorm -> Preferences -> Languages & Frameworks -> TypeScript```.


3. To run the Project make shure, you have XAMPP installed. 
   - Open XAMPP and under __Manage Servers__ start `MySQL Database` and `Apache Web Server`.
   - To import the Database, go back to the `Welcome` tab and press `Go to Application` and then navigate to `phpMyAdmin`.
   - create a new Database called `kms_sose22_grp1` and import the existing `kms_sose22_grp1.sql` from the `datenbank` folder in the Webstorm Project.


4. To run the Project go back to Webstorm and `run the server.js`.
   - Open [http://localhost:8080/index.html](http://localhost:8080/index.html) in your browser.

### Tests

To run our tests just go to package.json file and under `"scripts"` you can run the mocha test.

### Docs
