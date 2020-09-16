package com.example.unite;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;

import com.google.android.material.bottomnavigation.BottomNavigationView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.FragmentActivity;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

public class Browse extends AppCompatActivity {
    String s1[],s2[];
    RecyclerView recyclerView;
    View layout;
    int images[]= {R.drawable.index,R.drawable.image};
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_browse);

        BottomNavigationView navView = findViewById(R.id.nav_view);

        Log.d("abc", "onCreate: ");


        recyclerView=findViewById(R.id.feedView);
        // Passing each menu ID as a set of Ids because each
        // menu should be considered as top level destinations.
        AppBarConfiguration appBarConfiguration = new AppBarConfiguration.Builder(
                R.id.navigation_home, R.id.navigation_dashboard, R.id.navigation_notifications)
                .build();
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment);
        NavigationUI.setupActionBarWithNavController(this, navController, appBarConfiguration);
        NavigationUI.setupWithNavController(navView, navController);
        getSupportActionBar().hide();
        s1=getResources().getStringArray(R.array.items);
        s2=getResources().getStringArray(R.array.description);
/*
        Intent intent=new Intent(this,home_fragment.class);
        startActivity(intent);
        */

/*
        postsAdapter p=new postsAdapter(this,s1,s2,images);
        recyclerView.setAdapter(p);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

 */
    }

}


