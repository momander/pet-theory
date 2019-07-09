### Installing

Clone this repository to your local machine.

    git clone https://github.com/momander/pet-theory.git

Follow steps 1 and 4 at https://firebase.google.com/docs/web/setup.

When you run ``firebase init``, select Firestore and Hosting.

Then pick the option to create a new project.

Go with all the defaults after that.

Once the setup is done, go to https://console.cloud.google.com and pick your
newly created project.

Click the "hamburger menu" icon on the upper right-hand, pick Firestore, create
a new collection called ``pets``, and add a few docs to it. These docs
should have integer doc ids, and these fields (all strings):
+ customerName
+ customerPhone
+ petName
+ petType

Make sure one of the docs has the id 100135.

Deploy the app: ``firebase deploy``

Point your browser to [APP URL]/100135

Point your browser to [APP URL]/clinic/100135

