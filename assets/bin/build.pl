#!/usr/bin/perl
use FindBin qw($Bin);
use lib "$Bin/../lib";
use Path::Class qw(dir);
use File::Path qw(make_path remove_tree);

# Get absolute path to directory with this script in it
my $dir = dir($Bin);

# Our 'base path' is two levels higher... use Path::Class for this
my $basepath = $dir->parent->parent;

## Settings for this project
my $pandoc = '/usr/local/bin/pandoc';
my $flags  = '-f markdown -t slidy --standalone';
my $input  = $basepath . "/workshop.content";
my $output = $basepath . "/workshop.html";

system("$pandoc $flags $input > $output");