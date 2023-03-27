package epul.roblu.polymovie.controllers;

import epul.roblu.polymovie.dto.LoginDTO;
import epul.roblu.polymovie.dto.TokenDTO;
import epul.roblu.polymovie.models.Movie;
import epul.roblu.polymovie.models.User;
import epul.roblu.polymovie.services.UserService;
import epul.roblu.polymovie.utils.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class UserController {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserService userService;
    public UserController(AuthenticationManager authenticationManager, JwtUtil jwtUtil, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    @PostMapping("public/login")
    public ResponseEntity<TokenDTO> login(@RequestBody LoginDTO user) {
        try{
            Authentication authentication = authenticationManager.
                    authenticate(new UsernamePasswordAuthenticationToken(user.getLogin(), user.getPassword()));
            UserDetails userDetails= (UserDetails) authentication.getPrincipal();
            String token = jwtUtil.generateToken(userDetails);
            return ResponseEntity.ok(new TokenDTO(user.getLogin(), token));
        } catch (DisabledException e) {
            return ResponseEntity.status(403).build();
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).build();
        } catch (Exception e){
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping("public/register")
    public ResponseEntity<TokenDTO> register(@RequestBody LoginDTO user) {
        try{
            User newUser = new User();
            newUser.setLogin(user.getLogin());
            String hashedPassword = userService.hashPassword(user.getPassword());
            newUser.setPassword(hashedPassword);
            newUser.setRole("user");
            userService.save(newUser);
            Authentication authentication = authenticationManager.
                    authenticate(new UsernamePasswordAuthenticationToken(user.getLogin(), user.getPassword()));
            UserDetails userDetails= (UserDetails) authentication.getPrincipal();
            String token = jwtUtil.generateToken(userDetails);
            return ResponseEntity.ok(new TokenDTO(user.getLogin(), token));
        } catch (DisabledException e) {
            return ResponseEntity.status(403).build();
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).build();
        } catch (Exception e){
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("user")
    public ResponseEntity<User> getUser(Authentication authentication){
        if(authentication == null){
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(userService.getByLogin(((UserDetails) authentication.getPrincipal()).getUsername()));
    }

    @PostMapping("users/favorites/{id}")
    public ResponseEntity<User> addFavorite(Authentication authentication, @PathVariable int id){
        if(authentication == null){
            return ResponseEntity.status(401).build();
        }
        User user = userService.getByLogin(((UserDetails) authentication.getPrincipal()).getUsername());
        return ResponseEntity.ok(userService.addFavorite(user, id));
    }

    @DeleteMapping("users/favorites/{id}")
    public ResponseEntity<User> deleteFavorite(Authentication authentication, @PathVariable int id){
        if(authentication == null){
            return ResponseEntity.status(401).build();
        }
        User user = userService.getByLogin(((UserDetails) authentication.getPrincipal()).getUsername());;
        return ResponseEntity.ok(userService.deleteFavorite(user, id));
    }
}
